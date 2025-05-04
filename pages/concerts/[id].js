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

const bgUrl =
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80';

export default function ConcertDetail() {
  const router = useRouter();
  const { id } = router.query;
  const concert = concerts.find(c => c.id === Number(id));

  if (!concert) return <Container sx={{ mt: 8 }}>공연을 찾을 수 없습니다.</Container>;

  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(rgba(40,40,60,0.7),rgba(40,40,60,0.7)), url(${bgUrl}) center/cover no-repeat` }}>
      <Container maxWidth="md" sx={{ pt: 10, pb: 8 }}>
        <Card sx={{ boxShadow: 8, borderRadius: 5, background: 'rgba(255,255,255,0.97)' }}>
          <CardContent>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" mb={2} gap={2}>
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
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: 18, lineHeight: 1.7 }}>
              {concert.invitation}
            </Typography>
            <Typography variant="h5" fontWeight={600} sx={{ mt: 4, mb: 2 }} color="primary.main">
              프로그램
            </Typography>
            <List sx={{ bgcolor: 'rgba(245,247,250,0.7)', borderRadius: 3, boxShadow: 1 }}>
              {concert.program.map((piece, idx) => (
                <ListItem key={idx} divider sx={{ py: 2 }}>
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
                    <Button variant="outlined" color="error" startIcon={<YouTubeIcon />} sx={{ fontWeight: 600 }}>
                      유튜브로 듣기
                    </Button>
                  </MuiLink>
                </ListItem>
              ))}
            </List>
            <Box sx={{ mt: 5, textAlign: 'right' }}>
              <Link href="/" passHref legacyBehavior>
                <Button startIcon={<ArrowBackIcon />} variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 600 }}>
                  공연 목록으로
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
} 