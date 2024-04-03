import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Accordion, AccordionDetails, AccordionSummary, Button, CardActionArea, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../../components/Footer/Footer';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

//function to render content
function renderContent(content: any) {
  const processedContent = content
    .split('\n') // Split by newline characters
    .map((line: any, index: any) => {
      return <p key={index}>{line}</p>; // Regular paragraph
    });

  return processedContent;
}

export default function ContentFeed() {

  //Base url 
  const BASE_URL = import.meta.env.VITE_BASE_URL

  // State to store user details
  const [userDetails, setUserDetails] = useState<any>(null); // Change `any` to match your user details type

  const [userId, setUserId] = useState('')

  useEffect(() => {
    // Function to fetch user details
    const fetchUserDetails = async () => {
      try {
        // Retrieve the userId from sessionStorage
        let storedUserId = sessionStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId)
          // Make an HTTP GET request to fetch user details
          const response = await fetch(`${BASE_URL}/userDetails/${storedUserId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)
          setUserDetails(data);
        } else {
          console.log("User ID not found in sessionStorage.");
        }
      } catch (error) {
        console.error('There was a problem fetching user details:', error);
      }
    };

    // Call the fetch function when the component mounts
    fetchUserDetails();
  }, []); // Empty dependency array means this effect runs only once after the initial render


  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down(800));
  const evenMoreSmall = useMediaQuery(theme.breakpoints.down(500));

  //news start
  const [newsItems, setNewsItems] = useState<any[]>([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = 'pub_4091311458d0a1bcc6f15104f92ec11e7ac1c';
        const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=business&size=3&language=en`;
        const response = await axios.get(apiUrl);
        if (response.data && response.data.results) {
          setNewsItems(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);
  const handleRedirect = (link: string) => {
    window.open(link, '_blank'); // Open link in a new tab
  };
  //news ends

  // content feed starts
  const [contentFeeds, setContentFeeds] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/contentfeed`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        data.sort((a: any, b: any) => {
          const dateA = new Date(a.datePublish).getTime();
          const dateB = new Date(b.datePublish).getTime();
          return dateB - dateA; // Sort in descending order
        });

        setContentFeeds(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  //content Feed ends

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //Dialog box starts
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Dialog box ends


  //SnackBar Starts
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  //SnackBarEnds

  //Content Feed Starts
  const handlePost = () => {
    const textareaElement = document.querySelector('textarea');
    if (!textareaElement) {
      console.error('Textarea element not found');
      return;
    }

    let textareaValue = textareaElement.value;

    const contentFeedData = {
      id: userId, // Leave empty for automatic generation on the server side
      name: userDetails.firstName + " " + userDetails.lastName, // Default name
      feed: textareaValue,
      likes: {
        userIds: [], // Initialize with an empty array of user IDs
        count: 0, // Initial likes count
      },
      comments: [], // Default comments array
      datePublish: new Date().toISOString(), // Current date in ISO format
      image: userDetails.image, // Leave image empty for now
    };

    fetch(`${BASE_URL}/contentfeed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contentFeedData), // Send content feed data as JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Post successful:', data);
        setOpenSnackbar(true); // Open snackbar for successful post
        setSnackbarMessage('Post successful');
        setOpen(false); // Close the dialog after posting

        // Fetch updated content feeds after successful post
        fetch(`${BASE_URL}/contentfeed`)
          .then(response => response.json())
          .then(data => {
            data.sort((a: any, b: any) => {
              const dateA = new Date(a.datePublish).getTime();
              const dateB = new Date(b.datePublish).getTime();
              return dateB - dateA; // Sort in descending order
            });
            setContentFeeds(data); // Update contentFeeds state with fetched data
            setCurrentPage(1)
          })
          .catch(error => console.error('Error fetching content feeds:', error));
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        // Handle error or show error message to the user
      });
  };
  //Content feed ends


  //Comments and likes start 
  const [commentInput, setCommentInput] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const handleCommentClick = (index: number) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? -1 : index)); // Toggle expanded state
  };
  const handleCommentInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCommentInput(e.target.value);
  };
  const [selectedFeedIndices, setSelectedFeedIndices] = useState<number[]>([]);

  const handleThumbClick = async (feedId: string, userId: string, index: number) => {
    const feed = contentFeeds[index];
    const selectedIndex = selectedFeedIndices.indexOf(index);
    try {
      let apiEndpoint = '';
      let updatedLikes = feed.likes;
      if (selectedIndex === -1) {
        setSelectedFeedIndices([...selectedFeedIndices, index]);
        updatedLikes += 1;
        apiEndpoint = 'likes';
      } else {
        const updatedIndices = [...selectedFeedIndices];
        updatedIndices.splice(selectedIndex, 1);
        setSelectedFeedIndices(updatedIndices);
        updatedLikes -= 1;
        apiEndpoint = 'likesdecrement';
      }
      const response = await fetch(`${BASE_URL}/contentfeed/${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentFeedId: feedId, userId: userId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetch(`${BASE_URL}/contentfeed`)
        .then(response => response.json())
        .then(data => {
          data.sort((a: any, b: any) => {
            const dateA = new Date(a.datePublish).getTime();
            const dateB = new Date(b.datePublish).getTime();
            return dateB - dateA;
          });
          setContentFeeds(data);
        })
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  const handleDelete = async (feedId: string, commentId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/contentfeed/commentdelete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
        body: JSON.stringify({
          contentFeedId: feedId,
          commentId: commentId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete feed');
      }

      fetch(`${BASE_URL}/contentfeed`)
        .then(response => response.json())
        .then(data => {
          data.sort((a: any, b: any) => {
            const dateA = new Date(a.datePublish).getTime();
            const dateB = new Date(b.datePublish).getTime();
            return dateB - dateA; // Sort in descending order
          });
          setContentFeeds(data);
        })
      // Handle successful deletion, e.g., update UI or fetch updated data
      console.log('Feed deleted successfully');
    } catch (error) {
      console.error('Error deleting feed:', error);
      // Handle error, show error message to user, etc.
    }
  };
  const handleAddComment = async (idWhereThishasToStore: string, idWhoHasWrittenIt: string) => {
    try {
      console.log(idWhereThishasToStore , idWhoHasWrittenIt)
      const response = await fetch(`${BASE_URL}/contentfeed/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserWhereIHaveToStoreId: idWhereThishasToStore,
          UserWhoHasWritten: idWhoHasWrittenIt,
          comment: commentInput, // Assuming commentInput contains the new comment
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedContentFeed = await response.json();
      console.log('Comment added successfully:', updatedContentFeed);
      setCommentInput('');
      fetch(`${BASE_URL}/contentfeed`)
        .then(response => response.json())
        .then(data => {
          data.sort((a: any, b: any) => {
            const dateA = new Date(a.datePublish).getTime();
            const dateB = new Date(b.datePublish).getTime();
            return dateB - dateA; // Sort in descending order
          });
          setContentFeeds(data);
        })
        .catch(error => console.error('Error fetching content feeds:', error));
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error or show error message to the user
    }
  };
  //comment and likes ends


  //Content feed delete
  const handleDeleteFeed = async (feedId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/contentfeed/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
        body: JSON.stringify({
          contentFeedId: feedId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete feed');
      }

      fetch(`${BASE_URL}/contentfeed`)
        .then(response => response.json())
        .then(data => {
          data.sort((a: any, b: any) => {
            const dateA = new Date(a.datePublish).getTime();
            const dateB = new Date(b.datePublish).getTime();
            return dateB - dateA; // Sort in descending order
          });
          setContentFeeds(data);
        })
      // Handle successful deletion, e.g., update UI or fetch updated data
      console.log('Feed deleted successfully');
    } catch (error) {
      console.error('Error deleting feed:', error);
      // Handle error, show error message to user, etc.
    }
  };


  //Sorting
  const [sortOrder, setSortOrder] = useState('desc');
  const handleSortByLikes = () => {
    const sortedFeeds = [...contentFeeds];
    setExpandedIndex(-1)
    if (sortOrder === 'desc') {
      sortedFeeds.sort((a, b) => b.likes.count - a.likes.count);
      setSortOrder('asc');
    } else {
      setFilteredFeeds(contentFeeds);
      setSortOrder('desc');
      return;
    }
    setFilteredFeeds(sortedFeeds);
  };

  const [sortDescending, setSortDescending] = useState(true);
  const handleSortByDate = () => {
    const sortedFeeds = [...contentFeeds];
    setExpandedIndex(-1)
    sortedFeeds.sort((a, b) => {
      const dateA = new Date(a.datePublish).getTime();
      const dateB = new Date(b.datePublish).getTime();
      return sortDescending ? dateA - dateB : dateB - dateA;
    });
    setSortDescending((prevSort) => !prevSort);
    setFilteredFeeds(sortedFeeds);
  };
  const [age, setAge] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleFilterBasedOnId = (id: any) => {
    const filtered = contentFeeds.filter((feed) => feed.id === id);
    setFilteredFeeds(filtered);
  };

  const showAll = () => {
    setExpandedIndex(-1)
    fetch(`${BASE_URL}/contentfeed`)
      .then(response => response.json())
      .then(data => {
        data.sort((a: any, b: any) => {
          const dateA = new Date(a.datePublish).getTime();
          const dateB = new Date(b.datePublish).getTime();
          return dateB - dateA; // Sort in descending order
        });
        setContentFeeds(data);
      })
  }

  //Sorting ends


  //Searching
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeeds, setFilteredFeeds] = useState<any[]>([]);
  useEffect(() => {
    setFilteredFeeds(contentFeeds);
  }, [contentFeeds]);

  const handleSearchInputChange = (event: { target: { value: any; }; }) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = contentFeeds.filter((feed) =>
      feed.feed.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFeeds(filtered);
  };


  //Pagonation
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set items per page
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  useEffect(() => {
    const firstIndex = (currentPage - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    const updatedCurrentItems = filteredFeeds.slice(firstIndex, lastIndex);
    setCurrentItems(updatedCurrentItems);
  }, [currentPage, filteredFeeds, itemsPerPage]);
  const handlePageChange = (page: any) => {
    setExpandedIndex(-1)
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isMobileSize ? (
        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2%', width: '88%', marginLeft: '6%' }}>
          {userDetails && (
            <CardContent style={{ textAlign: 'center', padding: '0px 8px' }}>
              <img
                src={userDetails.image}
                alt="Profile"
                style={{ width: '40%', borderRadius: '40%', marginBottom: '10px' }}
              />
              <Typography style={{ padding: '0px' }} variant="h5" component="div">
                {userDetails.firstName} {userDetails.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userDetails.profession} at {userDetails.companyName}
              </Typography>
              <List >
                <ListItem style={{ padding: '0px' }} button onClick={handleExpandClick}>
                  <ListItemText primary="News" />
                  <IconButton
                    aria-label={expanded ? 'Collapse' : 'Expand'}
                    onClick={handleExpandClick}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </ListItem>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  {newsItems.map((item) => (
                    <List component="div" disablePadding>
                      <ListItem style={{ padding: '0px' }}>
                        <ListItemText secondary={item.source_id} onClick={() => handleRedirect(item.link)} />
                      </ListItem>
                    </List>
                  ))}
                </Collapse>
              </List>
            </CardContent>
          )}
        </Card>

      ) : (
        <Card
          sx={{
            maxWidth: '14%',
            position: 'absolute',
            top: theme.spacing(15),
            left: '1.5%',
            display: 'block',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: 4,
          }}
        >  {userDetails && (

          <CardActionArea>
            <CardContent style={{ textAlign: 'center' }}>
              <img
                src={userDetails.image}
                alt="Profile"
                style={{ width: '100%', borderRadius: '50%', marginBottom: '10px' }}
              />
              <Typography gutterBottom variant="h5" component="div">
                {userDetails.firstName} {userDetails.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                {userDetails.profession} at {userDetails.companyName}
              </Typography>
            </CardContent>
          </CardActionArea>
        )}
        </Card>
      )}

      <div style={{
        width: isMobileSize ? '90%' : '70%',
        marginLeft: isMobileSize ? '5%' : '15%',
        position: isMobileSize ? 'static' : 'static',
      }}>
        <div style={{ display: 'flex', flexDirection: evenMoreSmall ? 'column' : 'row' }}>
          <TextField
            placeholder="Search by feed..."
            fullWidth
            variant="outlined"
            style={{ padding: '0px', height: '57px', marginBottom: '2%', marginRight: '2%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ margin: '0px', padding: '0px', height: '100%' }}>
                  <SearchIcon style={{ margin: '0px', padding: '0px', height: '100%' }} />
                </InputAdornment>
              ),
              style: {
                borderRadius: '48px',
                height: '100%',
              },
            }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <FormControl style={{ width: evenMoreSmall ? '43%' : '19%', marginBottom: '2%', padding: '0px', marginLeft: evenMoreSmall ? '56%' : '', }}>
            <InputLabel style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Sort By .....
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Sort By ..."
              onChange={handleChange}
            >
              <MenuItem value={"Show All"} onClick={showAll}>Show All</MenuItem>
              <MenuItem value={"Likes"} onClick={handleSortByLikes}>Sort By Likes</MenuItem>
              <MenuItem value={"Date"} onClick={handleSortByDate}>Sort By Date </MenuItem>
              <MenuItem value={"Current User"} onClick={() => (handleFilterBasedOnId(userId))}>Current User</MenuItem>
            </Select>
          </FormControl>
        </div>


        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', marginBottom: '1.5%' }}>
          <Typography variant="h6" style={{ marginBottom: '16px', color: '#333' }}>Start a Post</Typography>
          <div
            id="postInput"
            style={{
              padding: '16px',
              marginBottom: '3%',
              border: '1px solid rgb(224, 224, 224)',
              borderRadius: '8px',
              backgroundColor: '',
              width: '100%',
              cursor: 'text', // Show text cursor on hover
            }}
            onClick={handleOpen}
          >
            <span>What's on your mind?</span>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                minWidth: '30%', 
              },
            }}
          >
            <DialogTitle>Compose Post</DialogTitle>
            <DialogContent>
              <textarea
                placeholder="Write your post here..."
                style={{ width: '100%', minHeight: '200px', padding: '5px', resize: 'vertical' }}
                spellCheck={false}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handlePost} color="primary">
                Post
              </Button>
            </DialogActions>
          </Dialog>

        </div>
        {currentItems.map((feed, index) => (
          <div key={index} style={{ border: '2px solid rgb(204, 204, 204)', padding: '10px', marginLeft: '0%', width: '100%', textAlign: 'center', marginBottom: '3%', borderRadius: '10px' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt="User Avatar" src={feed.image} />
                <Typography style={{ textAlign: 'left', marginLeft: '10px' }} variant="h6">{feed.name}</Typography>
              </div>

              {/* Conditionally render delete icon on the right */}
              {feed.id === userId && (
                <IconButton
                  style={{
                    zIndex: 1,
                  }}
                  onClick={() => handleDeleteFeed(feed.id)}
                  aria-label="delete-feed"
                >
                  <DeleteIcon style={{ color: 'primary' }} />
                </IconButton>
              )}
            </div>

            <div style={{ textAlign: 'left', margin: '2%' }}>{renderContent(feed.feed)}</div>
            <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around', marginBottom: '2%' }}>
              <ThumbUpIcon
                style={{
                  margin: '0 10px',
                  cursor: 'pointer',
                  color: feed.likes.userIds.includes(userId) ? '#071541' : 'grey', // Check if tempId is in the user likes
                }}
                onClick={() => handleThumbClick(feed.id, userId, index)} // Pass necessary parameters to handleThumbClick
              />
              <span style={{ marginLeft: evenMoreSmall ? '-32%' : isMobileSize ? '-41%' : '-43%' }}>{feed.likes.count}</span>
              <CommentIcon style={{ margin: '0 10px', cursor: 'pointer' }} onClick={() => handleCommentClick(index)} />
            </div>
            {expandedIndex === index && (
              <div>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    style={{
                      width: 'calc(100%)', // Adjust icon button width (56px) from input width
                      border: '1px solid rgb(204, 204, 204)',
                      padding: '3%',
                      borderRadius: '10px',
                    }}
                    type="text"
                    value={commentInput}
                    onChange={handleCommentInputChange}
                    placeholder="Add a comment"
                  />
                  <IconButton
                    style={{
                      position: 'absolute',
                      top: '-3px',
                      right: 0,
                      padding: '2.5%'
                    }}
                    onClick={() => handleAddComment(feed.id, userId)}
                    aria-label="add-comment"
                  >
                    <PostAddIcon />
                  </IconButton>
                </div>


                {feed.comments.length > 0 ? (
                  <div style={{ padding: '1%', margin: '2% 0%' }}>
                    {feed.comments.map((comment: any) => (
                      <div style={{ border: '1px solid #ccc' , padding:'1%' }}>
                        <div key={comment.id} style={{ display: 'flex' }}>
                          <div style={{ display: 'flex' }}>
                          <Avatar alt="User Avatar" src={comment.image} />
                            <div style={{ marginLeft: '5%' }}>
                              <p style={{whiteSpace:'nowrap' , marginTop:'1%'}}>{comment.name}</p>
                              <p>{comment.comment}</p>
                            </div>
                          </div>
                          <div style={{ marginLeft: 'auto' }}>
                            {comment.id === userId && (
                              <IconButton
                                style={{
                                  zIndex: 1,
                                }}
                                onClick={() => handleDelete(feed.id, comment.id)}
                              >
                                <DeleteIcon style={{ color: 'primary' }} />
                              </IconButton>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      <Pagination style={{
        display: 'flex',
        justifyContent: 'center'
      }} count={Math.ceil(filteredFeeds.length / itemsPerPage)} // Calculate total pages
        page={currentPage}
        onChange={(_event ,page) => handlePageChange(page)} />


      <Card sx={{
        width: '14%', right: '1.5%', position: 'absolute', top: theme.spacing(15), display: isMobileSize ? 'none' : 'block',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 3, // Add rounded corners
      }}>
        <CardContent style={{ padding: '8px', overflowWrap: 'break-word' }}>
          <Typography variant="h5" gutterBottom align="center">News</Typography>
          {newsItems.map((item) => (
            <Accordion>
              <AccordionSummary style={{ margin: '0%', padding: '0%' }} expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ padding: '0px', overflowWrap: 'break-word', fontSize: '0.76rem', maxWidth: '80%', marginLeft: '8%' }}>{item.source_id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  style={{ padding: '0px', whiteSpace: 'pre-line', cursor: 'pointer', color: 'black', fontSize: '0.7rem' }}
                  onClick={() => handleRedirect(item.link)}
                >{item.title}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>


      {/* Your component JSX */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
      <Footer />
    </>

  );
}
