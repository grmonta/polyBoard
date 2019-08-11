const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },

  projectTitle: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: String
  },
  objective: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  status: {
    type: String
  },
  task: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      name: {
        type: String
      },
      assignedBy: {
        type: String
      },
      assignedTo: {
        type: String
      },
      iat: {
        type: Date,
        default: Date.now
      },
      description: {
        type: String
      },
      taskTitle: {
        type: String
      },
      due: {
        type: Date
      },
      status: {
        type: String
      }
    }
  ]
});

module.exports = Project = mongoose.model('project', ProjectSchema);
