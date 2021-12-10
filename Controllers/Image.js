// import { json } from 'body-parser';
import Clarifai from 'clarifai';
const app= new Clarifai.App({
    apiKey:'4d095d79a9ca400b80f91593d285a60c'
  });

  //"a403429f2ddf4b49b307e318f00e528b"[Use this below incase of errors]
  const handleApiCall =(req, res)=>{
  app.models.predict(Clarifai.FACE_DETECT_MODEL , req.body.input)
  .then(data =>{
      res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage =(req, res, db)=>{
    const { id } = req.body;
    db('users').where('id', '=', id)
   .increment('entries',1)
   .returning('entries')
   .then (entries=>{
       res.json(entries[0]);
   })
   .catch(err => res.status(400).json('unable to get entries'))
    }


    export default {
        handleImage,
        handleApiCall
    }