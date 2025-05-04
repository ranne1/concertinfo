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

  // 프로그램 리스트를 팜플렛 스타일로 좌우 분리, Intermission/섹션 구분 강조
  const renderProgram = () => {
    const items = [];
    for (let i = 0; i < concert.program.length; i++) {
      const piece = concert.program[i];
      // Intermission/섹션 구분
      if (piece.title === 'Intermission') {
        items.push(
          <ListItem key={i} divider sx={{ justifyContent: 'center', bgcolor: 'transparent', py: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#c94b3a', fontStyle: 'italic', fontWeight: 700, fontSize: 18 }}>
              Intermission
            </Typography>
          </ListItem>
        );
        continue;
      }
      if (piece.title === '[ Guitar & Horn ]') {
        items.push(
          <ListItem key={i} divider sx={{ justifyContent: 'center', bgcolor: 'transparent', py: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#d86c3a', fontWeight: 700, fontSize: 18 }}>
              [ Guitar & Horn ]
            </Typography>
          </ListItem>
        );
        continue;
      }
      // 일반 곡
      items.push(
        <ListItem
          key={i}
          divider
          sx={{
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 1, sm: 3 },
            bgcolor: i % 2 === 0 ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.85)',
            fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif'
          }}
        >
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={700} color="primary" sx={{ fontSize: 18, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
              {piece.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 15, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
              {piece.composer} {piece.years && `(${piece.years})`}
            </Typography>
          </Box>
          <MuiLink
            href={piece.youtube}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{ ml: 2 }}
          >
            <Button variant="outlined" color="error" startIcon={<YouTubeIcon />} sx={{ fontWeight: 600, minWidth: isMobile ? 40 : 120, px: isMobile ? 1 : 2 }}>
              {!isMobile && '유튜브로 듣기'}
            </Button>
          </MuiLink>
        </ListItem>
      );
    }
    return items;
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#a6b36b' }}>
      <Container maxWidth="md" sx={{ pt: 10, pb: 8 }}>
        <Card sx={{ boxShadow: 8, borderRadius: 5, background: 'rgba(255,255,255,0.97)', border: '2px solid #d86c3a' }}>
          <CardContent>
            <Box mb={2}>
              <Typography variant="h4" fontWeight={700} color="primary.dark" gutterBottom sx={{ lineHeight: 1.2, mb: 0.5, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif', color: '#c94b3a' }}>
                {concert.titleMain}
              </Typography>
              <Typography variant="h5" color="secondary" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.2, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
                {concert.titleSub}
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
                <Chip icon={<CalendarMonthIcon />} label={concert.date} color="primary" variant="outlined" sx={{ fontWeight: 600, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }} />
                <Chip icon={<LocationOnIcon />} label={concert.bookingInfo} color="secondary" variant="filled" sx={{ fontWeight: 600, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }} />
              </Box>
            </Box>
            <Divider sx={{ mb: 3, borderColor: '#d86c3a' }} />
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: 18, lineHeight: 1.7, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
              {concert.invitation}
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 4, mb: 2, color: '#c94b3a', fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
              프로그램
            </Typography>
            <List sx={{ borderRadius: 3, boxShadow: 1, p: 0, mb: 2 }}>
              {renderProgram()}
            </List>
            <Box sx={{ mt: 5, textAlign: 'right' }}>
              <Link href="/" passHref legacyBehavior>
                <Button startIcon={<ArrowBackIcon />} variant="contained" color="secondary" sx={{ borderRadius: 2, fontWeight: 700, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
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