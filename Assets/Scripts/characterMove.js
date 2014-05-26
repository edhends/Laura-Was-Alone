#pragma strict

var speed : float;
var gravity : float;
var jumpSpeed : float;
var controller : CharacterController;
var portal : GameObject;

var myLevel : String;

private var isJumping : boolean;
var xScaleMultiplier : float;
var yScaleMultiplier : float;
private var yPosDelta : float;
private var lastPosition : Vector3;
private var originalScale : Vector3;

private var portalPosition : Vector3;
private var minDistanceFromPortalCenter : float;

private var moveDirection : Vector3 = Vector3.zero;

function Start () {
	originalScale = transform.localScale;
	lastPosition = transform.position;
	controller = GetComponent(CharacterController);
	portalPosition = portal.transform.position;
	minDistanceFromPortalCenter = (portal.renderer.bounds.size.x)/2;
}

function Update () {
	if(Input.GetKeyDown("escape")){
		Application.Quit();
	}
	yPosDelta = transform.position.y - lastPosition.y;
	lastPosition = transform.position;
	squashStretch();
	Debug.Log(isJumping);
	if(controller.isGrounded){
		moveDirection = Vector3(Input.GetAxis("Horizontal"),0,0);
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
		
		if(Input.GetButton("Jump")){
		moveDirection.y = jumpSpeed;
		isJumping = true;
		}
	}
	
		
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime);
	
	portalCollision();
}

function portalCollision(){
	if (Vector3.Distance(portalPosition, transform.position) <= minDistanceFromPortalCenter){
	Debug.Log("You Win!");
	portal.renderer.material.color = Color.black;
	Application.LoadLevel(myLevel);
	}
}
	
function squashStretch(){
	if(yPosDelta > 0 && isJumping){
		transform.localScale.x *= xScaleMultiplier;
		transform.localScale.y *= yScaleMultiplier;
	} else if(yPosDelta == 0 && isJumping){
		transform.localScale = originalScale;
		isJumping = false;
	}
}

