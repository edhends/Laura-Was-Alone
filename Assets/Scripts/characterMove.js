#pragma strict

var speed : float;
var gravity : float;
var controller : CharacterController;

private var moveDirection : Vector3 = Vector3.zero;

function Start () {
	controller = GetComponent(CharacterController);
}

function Update () {
	if(controller.isGrounded){
		moveDirection = Vector3(Input.GetAxis("Horizontal"),0,0);
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
	}
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime);
}