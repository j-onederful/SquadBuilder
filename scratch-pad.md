table: users

email:VARCHAR(255)
password:VARCHAR(255)

sequelize model:create --name user --attributes teamName:string,email:string,password:string


table: players

sequelize model:create --name player --attributes firstName:string,lastName:string,team:string,position:string,userId:integer



table: comments

content:VARCHAR(255)
name:VARCHAR(255)

sequelize model:create --name comment --attributes content:string,name:string,userId:integer