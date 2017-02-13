book = {
      title: { type: String, default: 'Title' },
      author: { type: String, default: 'Author' },
      status: { type: String, default: 'Current' },
      totalPages: { type: Number, default: 42 },
      notes: {
        type: String,
        default: ''
      },
      progress: {
        type: Object,
        default: {
          progress: 'progress'
        }
      }
}
