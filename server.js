const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const upload = multer();
app.use(cors());

app.post('/compare', upload.fields([{ name: 'file1' }, { name: 'file2' }]), (req, res) => {
  const file1 = req.files.file1[0].buffer.toString();
  const file2 = req.files.file2[0].buffer.toString();

  const differences = compareFiles(file1, file2);
  res.json({ differences });
});

function compareFiles(content1, content2) {
  if (content1 === content2) {
    return 'No differences';
  }
  return 'Files differ';
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
