// @mui
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// third party
import moment from "moment";
// _mock
import { _socials } from 'src/_mock';
// assets
import { AvatarShape } from 'src/assets/illustrations';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { HOST_API } from "../../config-global";
import { useExpire } from "./view/hooks";

// ----------------------------------------------------------------------

export default function UserCard({ user }) {
  const theme = useTheme();

  const { idCard, images, expire, nameAR } = user;

  const expireDate = useExpire(expire);

  return (
    <Card sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative" }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: "auto",
            bottom: -26,
            position: "absolute"
          }}
        />

        <Avatar
          alt={nameAR}
          src={`${HOST_API}${images[0]?.formats?.thumbnail?.url}`}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: "auto",
            position: "absolute"
          }}
        />

        <Image
          src={`${HOST_API}${images[0]?.url}`}
          alt={nameAR}
          ratio="16/9"
          overlay={alpha(theme.palette.grey[900], 0.48)}
        />
      </Box>

      <ListItemText
        sx={{ mt: 7, mb: 1 }}
        primary={nameAR}
        secondary={expireDate}
        primaryTypographyProps={{ typography: "subtitle1" }}
        secondaryTypographyProps={{ component: "span", mt: 0.5 }}
      />

     {/*  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              "&:hover": {
                bgcolor: alpha(social.color, 0.08)
              }
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack> */}

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box
        display="grid"
        /* gridTemplateColumns="repeat(3, 1fr)" */
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{ py: 3, typography: "subtitle1" }}
      >
        {/* <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Follower
          </Typography>
          {fShortenNumber(totalFollowers)}
        </div> */}

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: "text.secondary" }}>
            رقم البطاقة
          </Typography>

          {idCard}
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: "text.secondary" }}>
            تاريخ الإنتهاء
          </Typography>
          {/* {fShortenNumber(idCard)} */}
          {expire}
        </div>
      </Box>
    </Card>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
};
