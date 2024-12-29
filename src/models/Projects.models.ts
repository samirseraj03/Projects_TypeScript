import mongoose from 'npm:mongoose';


// mongoose automaticly convert model User to schme Users

const projectSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, default: mongoose.Schema.Types.ObjectId }, 
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    title: { type: String, required: true },
    subtitle: { type: String },
    tags: [{ type: String }],
    status: { 
      type: String, 
      enum: ['active', 'completed', 'draft'], 
      default: 'draft' 
    },
    source_type: { 
      type: String, 
      enum: ['closed', 'open'], 
      default: 'open' 
    },
    image_url: { type: String },
    archive_md_url: { type: String }
  });
  
  export const Project = mongoose.model('Project', projectSchema);
  
