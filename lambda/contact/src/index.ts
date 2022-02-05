import * as yup from 'yup';
import { sendMail } from './mail';

type RequestBody = {
  from: string,
  content: string
}

const schema = yup.object().shape({
  from: yup.string().email().required(),
  content: yup.string().required()
});

export const contact = async (req, res) => {
  let payload: RequestBody;

  setCorsHeader(res);
  if (req.method === 'OPTIONS') {
    respondCorsHeaders(res)    
    return res.status(204).send('');
  }

  try {
    payload = await schema.validate(req.body);
  } catch (err) {
    res.status(400).send(err)
    return;
  }

  const { from, content } = payload;
  try {
    await sendMail(from, content)
    res.status(204).end()
  } catch(err) {
    res.status(500).send(err)
  }
}

const respondCorsHeaders = (res) => {
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');
}

const setCorsHeader = (res) => {
  res.set('Access-Control-Allow-Origin', '*');
}