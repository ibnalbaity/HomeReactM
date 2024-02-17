import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import CardHeader from "@mui/material/CardHeader";
// _mock
// utils
// components
import Iconify from "src/components/iconify";
//
import UserCardList from "./user-card-list";

// ----------------------------------------------------------------------

export default function ProfileHome({ info }) {
  console.log(info);
  /* const handleAttach = () => {
  const fileRef = useRef(null);

    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const renderFollows = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {fNumber(info?.createdAt)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Follower
          </Box>
        </Stack>

        <Stack width={1}>
          {fNumber(info?.blocked)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Following
          </Box>
        </Stack>
      </Stack>
    </Card>
  ); */

  /* const renderAbout = (
    <Card>
      <CardHeader title="معلومات" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {username}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="fluent:mail-24-filled" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {email}
          </Box>
        </Stack>
      </Stack>
    </Card>
  ); */

  /* const renderPostInput = (
    <Card sx={{ p: 3 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
          <Fab size="small" color="inherit" variant="softExtended" onClick={handleAttach}>
            <Iconify icon="solar:gallery-wide-bold" width={24} sx={{ color: 'success.main' }} />
            Image/Video
          </Fab>

          <Fab size="small" color="inherit" variant="softExtended">
            <Iconify icon="solar:videocamera-record-bold" width={24} sx={{ color: 'error.main' }} />
            Streaming
          </Fab>
        </Stack>

        <Button variant="contained">Post</Button>
      </Stack>

      <input ref={fileRef} type="file" style={{ display: 'none' }} />
    </Card>
  ); */

  /* const renderSocials = (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link) => (
          <Stack
            key={link.name}
            spacing={2}
            direction="row"
            sx={{ wordBreak: 'break-all', typography: 'body2' }}
          >
            <Iconify
              icon={link.icon}
              width={24}
              sx={{
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link color="inherit">
              {link.value === 'facebook' && info?.socialLinks?.facebook}
              {link.value === 'instagram' && info?.socialLinks?.instagram}
              {link.value === 'linkedin' && info?.socialLinks?.linkedin}
              {link.value === 'twitter' && info?.socialLinks?.twitter}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  ); */

  return (
    <Grid container spacing={3}>
      {/* <Grid xs={12} md={4}>
        <Stack spacing={3}>
          {renderFollows}

          {renderAbout}

          {renderSocials}
        </Stack>
      </Grid> */}

      <Grid xs={12}>
        <Stack spacing={3}>
          {/* {renderPostInput} */}

          {Array.isArray(info) ? info.map((post) => (
            /* <ProfilePostItem key={post.id} post={post} /> */
            <UserCardList key={post.id} users={info} />
          )) : null}

          {Array.isArray(info) && !info.length || info === undefined ? (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
              <Iconify icon="tabler:face-id-error" width={32} />
              <Box sx={{ typography: 'body2' }}>
                لا توجد معلومات
              </Box>
            </Stack>
          ) : null}
        </Stack>
      </Grid>
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.array
};
