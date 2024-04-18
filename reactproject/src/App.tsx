import { useState } from 'react';
import './index.css';

type OperationKey = 'sum' | 'sub' | 'divide' | 'multiple';


const fetchResult = async (firstValue: number, secondValue: number, operation: OperationKey) => {
  try {
    const response = await fetch('http://localhost:3000/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstValue, secondValue, operation })
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateSomeEmptyFields = (...args: any[]) => !args.every((arg) => !!arg);


function App() {
  const [result, setResult] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const firstValue = Number(formData.get('firstValue'));
    const secondValue = Number(formData.get('secondValue'));
    const operation = formData.get('operation') as OperationKey;

    if (validateSomeEmptyFields(firstValue, secondValue, operation)) {
      setFeedback('Por favor, preencha os campos');
      return;
    }

    const response = await fetchResult(firstValue, secondValue, operation);

    setFeedback(null);

    if (response.sucess) setResult(response.result);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='h-screen grid place-content-center'>
          <div className=' bg-gray-200 p-5 max-w-6xl grid grid-cols-12 gap-3'>
            {feedback && <div className='bg-red-400 col-span-12 p-3 text-white'>{feedback}</div>}
            <div className='col-span-8'>
              <div className='flex gap-3'>
                <input
                  name='firstValue'
                  className='w-full py-4 px-3 rounded'
                  type='number'
                  placeholder='Digite o primeiro valor'
                />
                <input
                  name='secondValue'
                  className='w-full py-4 px-3 rounded'
                  type='number'
                  placeholder='Digite o segundo valor'
                />
              </div>
            </div>

            <div className='col-span-4'>
              <div className='flex gap-3'>
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded text-sm w-ful'
                >
                  Calcular
                </button>
                <button
                  type='reset'
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded text-sm w-full'
                >
                  Limpar
                </button>
              </div>
            </div>

            <div className='col-span-8 p-3 bg-yellow-100 border-2 rounded border-yellow-200'>Resultado: {result}</div>

            <div className='col-span-4 p-3border'>
              <select name='operation' className='w-full h-full py-2 px-3 rounded' id='operationSelect'>
                <option value='default' disabled selected hidden>
                  Selecione uma operação
                </option>
                <option value='sum'>Soma</option>
                <option value='sub'>Subtração</option>
                <option value='divide'>Divisão</option>
                <option value='multiple'>Multiplicação</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
