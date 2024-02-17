import { useCallback, useEffect, useState } from "react";
// @mui
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
// redux
import { useDispatch } from "src/redux/store";
import { getUser } from "src/redux/slices/user";
// routes
import { paths } from "src/routes/paths";
import { useParams } from 'src/routes/hook';
import { RouterLink } from 'src/routes/components';
// auth
import { useAuthContext } from "src/auth/hooks";
// hooks
// import { useMockedUser } from "src/hooks/use-mocked-user";
// _mock
import { _userAbout, _userFeeds, _userFollowers, _userFriends, _userGallery } from "src/_mock";
// components
import Iconify from "src/components/iconify";
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import ProfileHome from "../profile-home";
import ProfileCover from "../profile-cover";
import ProfileFriends from "../profile-friends";
import ProfileGallery from "../profile-gallery";
import ProfileFollowers from "../profile-followers";
import { UserProfileSkeleton } from "../user-skeleton";
import { useUser } from "./hooks";
import { HOST_API } from "../../../config-global";

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'mainInfo',
    label: 'الهوية',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'passport',
    label: 'جواز السفر',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
  },
  {
    value: 'insurance',
    label: 'التأمين الطبي',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
  {
    value: 'driverLicense',
    label: 'رخصة القيادة',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
  {
    value: 'vehicleRegister',
    label: 'استمارة السيارة',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

function useInitial() {
  const dispatch = useDispatch();

  const { user } = useAuthContext();

  const params = useParams();

  const { id } = params;

  const getProductCallback = useCallback(() => {
    if (id  || user?.id) {
      dispatch(getUser(id || user?.id, { populate: 'deep,4' }));
    }
  }, [dispatch, id, user]);

  useEffect(() => {
    getProductCallback();
  }, [getProductCallback]);

  return null;
}

// ----------------------------------------------------------------------

export default function UserProfileView() {
  useInitial();

  const settings = useSettingsContext();

  const { user, userStatus } = useUser();

  console.log(userStatus);
  // const { user } = useMockedUser();

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('mainInfo');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleSearchFriends = useCallback((event) => {
    setSearchFriends(event.target.value);
  }, []);

  const renderSkeleton = <UserProfileSkeleton />;

  /* const renderError = (
    <EmptyContent
      filled
      title={`${userStatus.error?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.user.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  ); */

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="الملف الشخصي"
        links={[
          { name: 'الرئيسية', href: paths.dashboard.root },
          { name: 'الأعضاء', href: paths.dashboard.user.list },
          { name: user?.username },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={user?.job?.name}
          name={user?.username}
          avatarUrl={`${HOST_API}${user?.avatar?.formats?.thumbnail?.url}` || user?.username}
          coverUrl={`${HOST_API}${user?.avatar?.url}`}
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>

      {!userStatus.loading && currentTab === 'mainInfo' && <ProfileHome info={user?.identification?.mainInfo} />}

      {!userStatus.loading && currentTab === 'passport' && <ProfileHome info={user?.identification?.passport} />}

      {!userStatus.loading && currentTab === 'insurance' && <ProfileHome info={user?.identification?.insurance} />}

      {!userStatus.loading && currentTab === 'driverLicense' && <ProfileHome info={user?.identification?.driverLicense} />}

      {!userStatus.loading && currentTab === 'vehicleRegister' && <ProfileHome info={user?.identification?.vehicleRegister} />}
    </Container>
  );
}
