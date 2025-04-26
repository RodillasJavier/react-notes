# Lab 3 | React Notes
A post-it note style app where users can add notes, move them around, edit 
them, and delete them. This React app uses Firebase as its backend to store 
collections of notes. It is designed so that people in multiple browsers can 
edit and arrange them in real-time. The notes themselves will support 
markdown notation and editing.

## Setup

To set up the dev environment for this project, run `npm install` from the 
root directory.

## Deployment

Deployed via [render](https://render.com/) at this [link](https://lab3-react-notes-rodillasjavier.onrender.com).

## Functional Specs

- [x] add note (title bar)
- [x] delete note
- [x] move note (x, y)
- [x] edit note
- note structure
  - [x] title
  - [x] content
- [x] persists all changes in real time
- [x] updates based on fb events