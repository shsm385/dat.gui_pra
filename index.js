window.addEventListener('DOMContentLoaded', init);

function init() {
  // シーン
  var scene = new THREE.Scene();

  // レンダラー
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // カメラ
  var camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight);
  camera.position.set(0, 0, 100);
  scene.add(camera);

  // マウス
  var controls = new THREE.OrbitControls(camera);

  // ライト
  light = new THREE.DirectionalLight(0xcccccc,1);
  light.position = new THREE.Vector3(0, 10, 10);
  ambient = new THREE.AmbientLight(0x333333);
  scene.add(light);
  scene.add(ambient);

  // キューブ
  var geometry = new THREE.BoxGeometry(12,12,12);
  var c = '#c2dc94';
  var material = new THREE.MeshPhongMaterial({color: c});
  var cube = new THREE.Mesh( geometry, material);
  cube.position.set(0,0,0);
  scene.add(cube);

  // GUIパラメータ
  var guiCtrl = function(){
    this.Camera_x = 0;
    this.Camera_y = 0;
    this.Camera_z = 100;
    this.Message = '';
    this.color = "#c2dc94";
    this.alert = function(){
      alert("サンプル");
    };
  };

  gui = new dat.GUI();
  guiObj = new guiCtrl();
  var folder = gui.addFolder('Folder');
  folder.add( guiObj, 'Camera_x', 0, 100 ).onChange(setCameraPosition);
  folder.add( guiObj, 'Camera_y', 0, 100 ).onChange(setCameraPosition);
  folder.add( guiObj, 'Camera_z', 0, 100 ).onChange(setCameraPosition);
  folder.addColor( guiObj , 'color' ).onChange(setColor);
  folder.add( guiObj, 'alert' );
  folder.open();

  function setCameraPosition(){
    camera.position.set(guiObj.Camera_x, guiObj.Camera_y, guiObj.Camera_z);
  }

  function setColor(){
    material = new THREE.MeshPhongMaterial({color: guiObj.color});
    var cube = new THREE.Mesh( geometry, material);
    scene.add(cube);
  }
  // レンダリング
  function render(){
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene,camera);
  }

  render();
}
