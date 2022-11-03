resource "aws_lb" "alb" {
  name               = local.lb["name"]
  internal           = local.lb["internal"]
  load_balancer_type = "application"
  subnets            = [for s in data.aws_subnet.subnets : s.id]
}

resource "aws_lb_target_group" "group" {
  name        = local.lb.target_group["name"]
  port        = local.lb.target_group["port"]
  protocol    = local.lb.target_group["protocol"]
  vpc_id      = data.aws_vpc.vpc.id
  target_type = "ip"

  depends_on = [aws_lb.alb]
}

resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.group.arn
  }
}

# TODO: Fix hard code security group ID
resource "aws_security_group_rule" "inbound_80" {
  type = "ingress"
  from_port = 80
  to_port = 80
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = "sg-0ac8bc717ea9cfde6"
}
