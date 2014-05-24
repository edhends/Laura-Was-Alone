#pragma strict

var speed : float;
var gravity : float;
var controller : CharacterController;
var portal : GameObject;

private var portalPosition : Vector3;
private var minDistanceFromPortalCenter : float;

private var moveDirection : Vector3 = Vector3.zero;

function Start () {
	controller = GetComponent(CharacterController);
	portalPosition = portal.transform.position;
	minDistanceFromPortalCenter = (portal.renderer.bounds.size.x)/2;
}

function Update () {
	if(controller.isGrounded){
		moveDirection = Vector3(Input.GetAxis("Horizontal"),0,0);
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
	}
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime);
	
	portalCollision();
}

function portalCollision(){
	if (Vector3.Distance(portalPosition, transform.position) <= minDistanceFromPortalCenter){
	Debug.Log("You Win!");
	portal.renderer.material.color = Color.black;
	}
}