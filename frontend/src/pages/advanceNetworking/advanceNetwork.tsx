import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../utils/theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdvanceNetworkPage: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  // const [searchTerm, setSearchTerm] = useState("");
  const [usersPerRow, setUsersPerRow] = useState(5); // Default value
  const [paginatedUsers, setPaginatedUsers] = useState<any[][]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sendconnection, setSendConnection] = useState<any>(null);
  const [userConnections, setUserConnections] = useState<any>(null);
  const [filterByMyConnections, setFilterByMyConnections] =
    useState<boolean>(false);
  const [filterByRequestSent, setFilterByRequestSent] =
    useState<boolean>(false);
  const [filterByRequestReceived, setFilterByRequestReceived] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isMobileSize = useMediaQuery(theme.breakpoints.down(1100));
  const evenMoreSmall = useMediaQuery(theme.breakpoints.down(600));
  const [sortBy, setSortBy] = useState<string>("");

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  useEffect(() => {
    const fetchUserConnections = async () => {
      try {
        // Call the API to fetch user connections data
        const uid = sessionStorage.getItem("userId");
        console.log(uid);

        const response = await axios.get(
          `${BASE_URL}/networking/userconnections`,
          {
            params: {
              uid: uid,
            },
          }
        );

        setUserConnections(response.data); // Set the fetched user connections data in state
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user connections:", error);
        // Handle error if necessary
      }
    };

    fetchUserConnections(); // Call the function to fetch user connections on component mount
  }, [sendconnection]); // Add uid to the dependency array to trigger the effect whenever uid changes

  useEffect(() => {
    function handleResize() {
      // Determine the number of users to display per row based on screen size range
      if (window.innerWidth <= 500) {
        setUsersPerRow(1);
      } else if (window.innerWidth <= 1000) {
        setUsersPerRow(2);
      } else if (window.innerWidth <= 1500) {
        setUsersPerRow(4);
      } else {
        setUsersPerRow(5);
      }
    }

    // Initial call
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  const fetchData = async (
    pageNumber: number,
    filterByMyConnections: boolean,
    filterByRequestSent: boolean,
    filterByRequestReceived: boolean
  ) => {
    try {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const response = await axios.get(`${BASE_URL}/networking`, {
        params: {
          pageNumber: pageNumber,
        },
      });
      const { users, totalCount } = response.data;
      // Extract users and totalCount from the response

      // Filter users based on different types of connections if required
      let filteredUsers = users;
      if (filterByMyConnections) {
        filteredUsers = users.filter((user: any) =>
          userConnections.myConnections.includes(user.uid)
        );
      } else if (filterByRequestSent) {
        filteredUsers = users.filter((user: any) =>
          userConnections.requestSent.includes(user.uid)
        );
      } else if (filterByRequestReceived) {
        filteredUsers = users.filter((user: any) =>
          userConnections.requestReceived.includes(user.uid)
        );
      }

      const updatedSortedUsers = filteredUsers.map((user: any) => {
        // Check if user's UID is in requestSent, requestReceived, or myConnections
        if (userConnections.requestSent.includes(user.uid)) {
          user.flag = "rs"; // Flag for request sent
        } else if (userConnections.requestReceived.includes(user.uid)) {
          user.flag = "rc"; // Flag for request received
        } else if (userConnections.myConnections.includes(user.uid)) {
          user.flag = "mc"; // Flag for my connections
        } else {
          user.flag = "f"; // Flag for no connection
        }
        return user;
      });

      const newPaginatedUsers = [];
      for (let i = 0; i < updatedSortedUsers.length; i += usersPerRow) {
        newPaginatedUsers.push(updatedSortedUsers.slice(i, i + usersPerRow));
      }
      setPaginatedUsers(newPaginatedUsers);

      setTotalCount(totalCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      // Handle error if necessary
    }
  };

  const handleMyConnectionsClick = () => {
    setSortBy("myconnections");
    setPageNumber(1);
    setFilterByMyConnections(true);
    setFilterByRequestSent(false);
    setFilterByRequestReceived(false);
    console.log(filterByMyConnections);
    fetchData(1, true, false, false);
  };

  const handleRequestSentClick = () => {
    setSortBy("requestsent"); 
    setPageNumber(1);
    setFilterByMyConnections(false);
    setFilterByRequestSent(true);
    setFilterByRequestReceived(false);
    fetchData(1, false, true, false);
  };

  const handleRequestReceivedClick = () => {
    setSortBy("requestreceived");
    setPageNumber(1);
    setFilterByMyConnections(false);
    setFilterByRequestSent(false);
    setFilterByRequestReceived(true);
    fetchData(1, false, false, true);
  };

  const ShowAll = () => {
    setSortBy("showall"); 
    setPageNumber(1);
    setFilterByMyConnections(false);
    setFilterByRequestSent(false);
    setFilterByRequestReceived(false);
    fetchData(1, false, false, false);
  };

  useEffect(() => {
    fetchData(
      pageNumber,
      filterByMyConnections,
      filterByRequestSent,
      filterByRequestReceived
    );
    return () => { };
  }, [pageNumber, usersPerRow, userConnections, sendconnection]);

  const navigate = useNavigate();
  // Function to handle click event
  const handleClick = (userUid: string, flag: string) => {
    if (flag === "mc") {
      navigate("/messages", { state: { receiverId: userUid} });
    } else {
      handleSendConnection(userUid, flag);
    }
  };

  const handleSendConnection = async (userUid: string, flag: string) => {
    try {
      const loggedInUserId = sessionStorage.getItem("userId");
      if (!loggedInUserId) {
        console.error("User not logged in");
        return;
      }
      let apiUrl = "";
      switch (flag) {
        case "rs":
          apiUrl = `${BASE_URL}/networking/handleRequestSent`;
          break;
        case "rc":
          apiUrl = `${BASE_URL}/networking/handleRequestReceived`;
          break;
        case "mc":
          apiUrl = `${BASE_URL}/networking/handleMyConnection`;
          break;
        default:
          apiUrl = `${BASE_URL}/networking/sendConnectionRequest`;
      }

      const response = await axios.post(apiUrl, {
        userUid: userUid,
        loggedInUserId: loggedInUserId,
      });
      console.log(response.data);
      setSendConnection(response.data);
      console.log(sendconnection);
    } catch (error) {
      console.error("Error sending connection request:", error);
      // Handle error if necessary
    }
  };

  const handlePageChange = (page: number) => {
    setPageNumber(page); // Update the page number state
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {loading && (
          <CircularProgress
            style={{ position: "absolute", top: "50%", left: "50%" }}
          />
        )}
        <div>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              {/* <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ borderRadius: "20px", width: "45%", marginRight: "5%" }}
              /> */}
              <Select
                // onChange={handleSortChange}
                value={sortBy} // Set value of the Select component
                onChange={(e) => setSortBy(e.target.value as string)}
                displayEmpty
                inputProps={{ "aria-label": "Sort By" }}
                sx={{ borderRadius: "20px", width: "20%" }}
              >
                <MenuItem value="">Sort By</MenuItem>
                <MenuItem
                  value="myconnections"
                  onClick={handleMyConnectionsClick}
                >
                  My Connections
                </MenuItem>
                <MenuItem
                  value="requestsent"
                  onClick={handleRequestSentClick}
                >
                  Connection Requests Sent
                </MenuItem>
                <MenuItem
                  value="requestreceived"
                  onClick={handleRequestReceivedClick}
                >
                  Connections Requests Received
                </MenuItem>
                <MenuItem value="showall" onClick={ShowAll}>
                  Show All
                </MenuItem>
                {/* Add more sorting options if needed */}
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              {paginatedUsers.length > 0 &&
                paginatedUsers.map((userGroup: any[]) =>
                  userGroup.map((user: any) => (
                    <Card
                      key={user.uid}
                      sx={{
                        width: evenMoreSmall
                          ? "60%"
                          : isMobileSize
                            ? "35%"
                            : "22%",
                        margin: "16px",
                        padding: "2%",
                      }}
                    >
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: "100%",
                        }}
                      >
                        <Avatar
                          src={user.image}
                          sx={{ width: 140, height: 140 }}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="center"
                          >
                            {user.firstName} {user.lastName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                          >
                            {user.profession
                              ? user.profession
                              : "Profession not available "}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                          >
                            {user.companyName
                              ? user.companyName
                              : "Company not available"}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleClick(user.uid, user.flag)}
                          >
                            {user.flag === "f" && "Send Connection Request"}
                            {user.flag === "rs" &&
                              "Request Sent, Click Again to Cancel"}
                            {user.flag === "rc" && "Request Received"}
                            {user.flag === "mc" && "Already a Connection, Click to message"}
                          </Button>
                        </CardActions>
                      </Box>
                    </Card>
                  ))
                )}
            </Box>
          </Box>

          <Pagination
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            count={Math.ceil(totalCount / 12)} // Calculate total pages using total count
            page={pageNumber}
            onChange={(_event, page) => handlePageChange(page)}
          />
        </div>
      </div>
    </>
  );
};

export default AdvanceNetworkPage;
