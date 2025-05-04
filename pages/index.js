import Link from 'next/link';
import { concerts } from '../data/concerts';
import { Card, CardContent, Typography, Button, Container, Box, Chip } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', background: '#a6b36b' }}>
      <Container maxWidth="sm" sx={{ pt: 10, pb: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" sx={{ color: '#c94b3a', fontWeight: 700, letterSpacing: 2, mb: 1, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
            클래식 기타 공연
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', opacity: 0.9, mb: 2, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
            다가오는 공연을 만나보세요
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={5}>
          {concerts.map(concert => (
            <Card
              key={concert.id}
              sx={{
                borderRadius: 4,
                boxShadow: 6,
                background: 'rgba(255,255,255,0.92)',
                border: '2px solid #d86c3a',
                px: 1
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom color="primary.dark" sx={{ fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif', color: '#c94b3a', mb: 0 }}>
                  {concert.titleMain}
                </Typography>
                <Typography variant="subtitle1" color="secondary" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.2, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
                  {concert.titleSub}
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Chip label={concert.date} color="primary" variant="outlined" size="small" sx={{ fontWeight: 600, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }} />
                  <Chip label={concert.bookingInfo} color="secondary" variant="filled" size="small" sx={{ fontWeight: 600, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ minHeight: 40, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
                  {concert.invitation.slice(0, 60)}...
                </Typography>
                <Link href={`/concerts/${concert.id}`} passHref legacyBehavior>
                  <Button variant="contained" color="secondary" sx={{ mt: 2, borderRadius: 2, px: 4, fontWeight: 700, fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif' }}>
                    상세 보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
} 