const fs = require('fs');
const csv = require('csvtojson');

// Caminho do arquivo CSV de entrada
const inputFile = './input.csv';

// Caminho do arquivo JSON de saída
const outputFile = './output.json';

// Função para converter CSV em JSON
const convertCsvToJson = async () => {
  try {
    const jsonArray = await csv().fromFile(inputFile); // Converte CSV para JSON
    fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2), 'utf8'); // Escreve JSON no arquivo de saída
    console.log(`Conversão concluída! Arquivo salvo em: ${outputFile}`);
  } catch (error) {
    console.error('Erro ao converter CSV para JSON:', error.message);
  }
};

// Chama a função de conversão
convertCsvToJson();
