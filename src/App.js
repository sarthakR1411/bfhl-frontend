import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);

      const res = await fetch('curl https://bajaj-backend-mlbta7k94-sarthakr1411s-projects.vercel.app/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      if (!res.ok) throw new Error('Failed to fetch from backend');
      const data = await res.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or server error');
    }
  };

  const handleDropdownChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Challenge</h1>
      <textarea
        placeholder="Enter JSON here"
        value={jsonInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {response && (
        <div>
          <select multiple onChange={handleDropdownChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highestLowercaseAlphabet">Highest Lowercase Alphabet</option>
          </select>

          <div>
            {selectedOptions.includes('alphabets') && (
              <p>Alphabets: {response.alphabets.join(', ')}</p>
            )}
            {selectedOptions.includes('numbers') && (
              <p>Numbers: {response.numbers.join(', ')}</p>
            )}
            {selectedOptions.includes('highestLowercaseAlphabet') && (
              <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;