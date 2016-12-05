var canvas = document.getElementById('canvas');
var context = new GLBoost.GLBoostMiddleContext(canvas);
var renderer = context.createRenderer({ clearColor: { red: 0.25, green: 0.25, blue: 0.25, alpha: 1 } });
var scene = context.createScene();

var light1 = context.createPointLight(new GLBoost.Vector3(1.25, 1.25, 1.25));
light1.translate = new GLBoost.Vector3(10, 10, 10);
scene.addChild(light1);
var light2 = context.createPointLight(new GLBoost.Vector3(1.0, 1.0, 1.0));
light2.translate = new GLBoost.Vector3(-10, 10, -10);
scene.addChild(light2);

var camera = context.createPerspectiveCamera({
  eye: new GLBoost.Vector3(5, 3, 5),
  center: new GLBoost.Vector3(0.0, 2, 0.0),
  up: new GLBoost.Vector3(0.0, 1.0, 0.0),
}, {
  fovy: 45.0,
  aspect: 1.0,
  zNear: 0.1,
  zFar: 1000,
});
scene.addChild(camera);

var expression = context.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

var render = function() {
  scene.setCurrentAnimationValue('time', (Date.now() % 1300) / 1000);
  renderer.clearCanvas();
  renderer.draw(expression);

  requestAnimationFrame(render);
};
render();

// glTFデータをロード
var glTFLoader = GLBoost.GLTFLoader.getInstance();
glTFLoader
  .loadGLTF(context, 'kick.gltf', 1, null)
  .then(function(group) {
    group.scale = new GLBoost.Vector3(1, 1, 1);
    scene.addChild(group);

    expression.prepareToRender();
  });
