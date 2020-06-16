const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
  INDEX = 1;
  NEGATIVE = -1;

  const current_rep = repositories.findIndex(repository => repository.id === id);

  if(current_rep === NEGATIVE){
    return response.status(400).json({error:"Not Found"});
  }
  
  const newRepository = {
    id,
    title,
    url,                                      
    techs,                                                                                                                                                                                                                                                      
    likes : INDEX
  }

  newRepository.likes = repositories[current_rep].likes;

  repositories[current_rep] = newRepository

  return response.json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  NEGATIVE = -1;

  const current_rep = repositories.findIndex(repository => repository.id === id);

  if(current_rep === NEGATIVE){
    return response.status(400).json({error:"Not found"});
  }
  repositories.splice(current_rep,1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  NEGATIVE = -1;
  const current_rep = repositories.findIndex(repository => repository.id === id);

  if(current_rep === NEGATIVE){
    return response.status(400).json({error:"Not Found"});
  }

  const likes = (repositories[current_rep].likes + 1);

  const value = repositories[current_rep];
  
  const newRepository = {
    id: value.id,
    title: value.title,
    url: value.url,                       
    techs: value.techs,                                                                                                                                                                                                                                                      
    likes
  }

  repositories[current_rep] = newRepository

  return response.json(newRepository);
});


module.exports = app;
