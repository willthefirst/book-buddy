import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { Button } from 'react-bootstrap'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

// #todo: customize text editor: https://jpuri.github.io/react-draft-wysiwyg/#/docs
// also https://github.com/jpuri/react-draft-wysiwyg/blob/master/docs/src/components/Demo/index.js
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export class Notes extends Component {
  render () {
    const { updateBookNotes, onEditorStateChange, editorState, bookId } = this.props

    const toolbarOptions = {
      options: ['inline', 'blockType'],
      inline: {
        options: ['bold', 'italic', 'underline']
      }
    }

    return (
      <div>
        <Editor
          wrapperClassName='react-draft__wrapper'
          editorClassName='react-draft__editor'
          toolbarClassName='react-draft__toolbar'
          toolbar={toolbarOptions}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          />
        <LaddaButton
          onClick={() => updateBookNotes(editorState, bookId)}
          loading={this.props.loading}
          className='btn btn-primary'
          data-size={L}
          data-style={SLIDE_DOWN}
          data-spinner-color='#ddd'
          >
          Save
        </LaddaButton>
        {"   "}<span className="text-warning">{this.props.errorMessage}</span>
      </div>
    )
  }
}

Notes.propTypes = {
  editorState: React.PropTypes.object.isRequired,
  updateBookNotes: React.PropTypes.func.isRequired,
  onEditorStateChange: React.PropTypes.func.isRequired,
  bookId: React.PropTypes.string
}

export default Notes
