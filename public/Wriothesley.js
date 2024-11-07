import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const hideableBox = document.createElement("div");
const list = document.createElement("div");
hideableBox.setAttribute("class", "list");
const hideButton = document.createElement("button");
hideButton.setAttribute("class", "hideBtn");
hideButton.innerHTML = "<<";
hideButton.setAttribute("isHidden", false);
hideButton.onclick = function () {
    let hide = hideButton.getAttribute("isHidden") != "true";
    console.log(hideButton.getAttribute("isHidden"), ' - ', hide);
    hideButton.setAttribute("isHidden", hide)
    hideButton.innerHTML = hide ? ">>" : "<<";
    list.hidden = hide;
}

hideableBox.appendChild(hideButton)
hideableBox.appendChild(list)
document.body.appendChild(hideableBox)

document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const loader = new GLTFLoader();

let models = [];

function doLoad(modelPath) {
    loader.load(modelPath, function (gltf) {
        models.push({
            name: modelPath.replace(/models\/(.*?)\.glb/g, '$1'),
            model: gltf.scene
        })
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
}

doLoad('models/W_Head.glb');
doLoad('models/W_Arm_L.glb');
doLoad('models/W_Arm_R.glb');
doLoad('models/W_JacketChain.glb');
doLoad('models/W_Boot_L.glb');
doLoad('models/W_Boot_R.glb');
doLoad('models/W_BootClips.glb');
doLoad('models/W_ChestChains.glb');
doLoad('models/W_ChestEmblem.glb');
doLoad('models/W_ClipTie.glb');
doLoad('models/W_Handcuffs.glb');
doLoad('models/W_Jacket.glb');
doLoad('models/W_Pelvis.glb');
doLoad('models/W_Shirt_Buttons.glb');
doLoad('models/W_Shirt.glb');
doLoad('models/W_Tie.glb');
doLoad('models/W_Vest.glb');
doLoad('models/W_Vision.glb');



const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();
// controls.enablePan = false;
// controls.panSpeed = 0.1;
controls.enableDamping = true;

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

const updateVisibility = () => {
    models.forEach(model => {
        model.model.visible = document.querySelector(`#${model.name}`).checked
    });
}

function animate() {
    requestAnimationFrame(animate);

    //mixer.update( clock.getDelta() );
    controls.update();

    renderer.render(scene, camera);
    if (models.length == 18) {
        if (list.children.length == 0) {
            models.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            models.forEach(model => {
                let item = document.createElement("div");
                item.setAttribute("class", "listItem");
                let input = document.createElement("input");
                input.id = model.name;
                input.type = "checkbox";
                input.checked = true;
                input.addEventListener('change', updateVisibility);
                item.appendChild(input);
                let label = document.createElement("label");
                label.setAttribute("for", model.name);
                label.innerHTML = model.name;
                item.appendChild(label);
                list.appendChild(item);
            });
            return;
        }
    }
}
animate();