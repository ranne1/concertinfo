import Link from 'next/link';
import { concerts } from '../data/concerts';
import { Card, CardContent, Typography, Button, Container, Box, Chip } from '@mui/material';

const bgUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(rgba(30,30,60,0.7),rgba(30,30,60,0.7)), url(${bgUrl}) center/cover no-repeat` }}>
      <Container maxWidth="sm" sx={{ pt: 10, pb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          다가오는 클래식 기타 공연
        </Typography>
        <Box display="flex" flexDirection="column" gap={4}>
          {concerts.map(concert => (
            <Card key={concert.id} sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={600} gutterBottom color="primary.dark" sx={{ lineHeight: 1.2 }}>
                  {concert.titleMain}
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 500, mb: 1, lineHeight: 1.2 }}>
                  {concert.titleSub}
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Chip label={concert.date} color="primary" variant="outlined" size="small" />
                  <Chip label={concert.bookingInfo} color="secondary" variant="filled" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ minHeight: 40 }}>
                  {concert.invitation.slice(0, 60)}...
                </Typography>
                <Link href={`/concerts/${concert.id}`} passHref legacyBehavior>
                  <Button variant="contained" color="primary" sx={{ mt: 2, borderRadius: 2, px: 4, fontWeight: 600 }}>
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