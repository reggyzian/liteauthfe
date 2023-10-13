import axios from 'axios';

export default async function handler(req, res) {
  const token = await axios.get('http://localhost:5000/token', {
    withCredentials: true,
  });
  res.status(token.status).json(token.headers);
}
