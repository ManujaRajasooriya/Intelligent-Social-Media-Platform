// import { request } from "http";
// import Cors from 'cors';

// Initializing the cors middleware
// const cors = Cors({
//   methods: ['GET', 'HEAD', 'POST'],
//   origin: '*' // This will allow access to all resources
// });

// function runMiddleware(req, res, fn) {
//     return new Promise((resolve, reject) => {
//       fn(req, res, (result) => {
//         if (result instanceof Error) {
//           return reject(result);
//         }
//         return resolve(result);
//       });
//     });
//   }
  

const TENSORFLOW_SERVING_URL = 'http://localhost:8501/v1/models/toxicity_checker:predict';

export const getPrediction = async (text: string): Promise<any> => {

    // await runMiddleware(req, res, cors);

    const body = {
        "instances": [[text]]
    };

    console.log(body)

    try {
        
        const response = await fetch(TENSORFLOW_SERVING_URL, {
            // mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
           
        });

        console.log('Response Status:', response.status)

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result)
        return result.predictions[0];

    } catch (error) {
        console.error('Error getting prediction from TensorFlow Serving:', error);
        throw new Error('Failed to get prediction');
    }
};
