//get method for getting all the departments
const SingupUser = async (req, res) => {
  res.status(200).send({ id: "signup successfully" });
};

//add a department
const LoginUser = async (req, res) => {
  const body = req.body;

  res.status(200).send({ body: body.name });
};

module.exports = {
  SingupUser,
  LoginUser,
};
