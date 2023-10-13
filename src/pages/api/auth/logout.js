import axios from 'axios';

export default async function handler(req, res) {
  try {
    const logout = await axios.delete('http://localhost:5000/users/logout', {
      withCredentials: true,
    });

    if (logout.status === 200) {
      res.status(200).json(logout.data);
    }
  } catch (error) {
    res.status(error.response.status).json({ msg: error.response.data });
  }
}
