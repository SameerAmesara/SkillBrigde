import { Avatar, Box, Typography } from "@mui/material";
import { UserDetails } from "../../models/UserDetatils.model";

const DashboardNetworkCard = ({ user }: { user: UserDetails }) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={3}
      px={5}
      gap={1}
    >
      <Avatar
        alt={fullName}
        src={user.image ?? ""}
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant="h6">{fullName}</Typography>
    </Box>
  );
};

export default DashboardNetworkCard;
