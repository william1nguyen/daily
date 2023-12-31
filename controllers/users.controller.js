const { prisma, createUser } = require('./prisma.controller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const PASSWORD_MIN_LENGTH = 8;

const signUp = async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  
  if (!username || !email || !password || !passwordConfirm) {
    return res.status(400).send({ error: "Some fields are missed!" });
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return res.status(400).send({ error: "Password didn't reach minimum length!" });
  }

  if (password !== passwordConfirm) {
    return res.status(400).send({ error: "Password didn't match!" });
  }

  if (await prisma.user.findFirst({ where: {email: { equals: email }}})) {
    return res.status(400).send({ error: "User is already exist!" });
  }

  const saltRound = 10;
  const salt =  await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user_req = {
    username: username,
    email: email,
    hashedPassword: hashedPassword
  }

  const user = await createUser(user_req);

  return res
    .status(201)
    .send({
      message: "Successfully sign up!",
      user: user
    });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).send({ error: "Email and password is required!" });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: { equals: email, },
    },
  });

  if (!user) {
    return res.status(404).send({ error: "Email is invalid!" });
  }

  const response = await bcrypt.compare(password, user?.hash_password);
  if (!response) {
    return res.status(404).send({ error: "Password is invalid!" });
  }

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

  return res
    .status(200)
    .send({ 
        message: "Successfully login",
        "access_token": token,
    });
};

const getMe = async (req, res) => {
  const user = await prisma.user.findFirst({
    where: { id: { equals: req.user_id } }
  })
  if (user) {
    return res.status(200).send({ user: user });
  } else {
    return res.status(404).send({ error: "User doesn't exist!" });
  }
}

module.exports = { signUp, signIn, getMe };
