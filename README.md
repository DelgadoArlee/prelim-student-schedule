unlearning-the-past
student-schedule-viewer
Delgado,Arlee
Bretana, Kieth Benedeict,
Tarrosa, John Victor

run npm install on both client folder a

To run:

run at the sametime
Backend -> dir> npm run dev

Frontend -> dir/client> npm start


Create .env file the contains the ff:
PORT=
DATABASE_URL="postgresql://USER:PASSWORD@localhost:PORT/DBNAME" ->

Database Instructions:
Create db in psql and
Do this at root folder
 1.) npm i 
 2.) npx prisma generate
 3.) npx prisma migrate dev

 npx prisma studio - to view database


controller folder: holds the database queries
api: holds routers