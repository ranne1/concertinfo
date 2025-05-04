import { useRouter } from 'next/router';
import { concerts } from '../../data/concerts';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Button,
  Chip,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ConcertDetail() {
  const router = useRouter();
  const { id } = router.query;
  const concert = concerts.find(c => c.id === Number(id));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!concert) return <Container sx={{ mt: 8 }}>공연을 찾을 수 없습니다.</Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Card sx={{ boxShadow: 4 }}>
        <CardContent>
          <Box mb={2}>
            <Typography variant="h4" fontWeight={700} color="primary.dark" gutterBottom sx={{ lineHeight: 1.2, mb: 0.5 }}>
              {concert.titleMain}
            </Typography>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 500, mb: 1, lineHeight: 1.2 }}>
              {concert.titleSub}
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
              <Chip icon={<CalendarMonthIcon />} label={concert.date} color="primary" variant="outlined" />
              <Chip icon={<LocationOnIcon />} label={concert.bookingInfo} color="secondary" variant="filled" />
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: 18, lineHeight: 1.7 }}>
            {concert.invitation}
          </Typography>
          <Typography variant="h5" fontWeight={600} sx={{ mt: 4, mb: 2 }} color="primary.main">
            프로그램
          </Typography>
          <List>
            {concert.program.map((piece, idx) => (
              <ListItem key={idx} divider>
                <ListItemText
                  primary={
                    <>
                      <strong>{piece.title}</strong> - {piece.composer} ({piece.years})
                    </>
                  }
                />
                <MuiLink
                  href={piece.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                >
                  <Button variant="outlined" color="secondary" startIcon={<YouTubeIcon />} sx={{ fontWeight: 600 }}>
                    {!isMobile && '유튜브로 듣기'}
                  </Button>
                </MuiLink>
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 4 }}>
            <Link href="/" passHref legacyBehavior>
              <Button startIcon={<ArrowBackIcon />} variant="text">
                공연 목록으로
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
} 