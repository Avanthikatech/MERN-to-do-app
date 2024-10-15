const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true }, { new: true })
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json(result);
        })
        .catch(err => res.status(500).json(err));
});
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json({ success: true, message: 'Task deleted successfully' });
        })
        .catch(err => res.status(500).json(err));
});


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: 'Failed to create task', details: err }));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
