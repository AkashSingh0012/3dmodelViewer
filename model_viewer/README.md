models GoogleDriveLink: 



data/marker.json : add or remove markers data by updating the json file

*for Example
{
    "id": "marker-3",
    "name": "ICARS",
    "x": -0.3,
    "y": 0.1,
    "z": -0.4
  },

in this  
id = id of the marker used during the legend showcase
name: displayed during the clicking on the marker and on clicking on the legend
x,y,z are the position of the marker in the model



Model: 
step1: to load the model go to pulic/models 
step2: add the .glb file in the folder
step3: go to 3dmodelViewer\model_viewer\app\page.tsx
and in 
 modelUrl= "/models/<yourmodelname>.glb"
