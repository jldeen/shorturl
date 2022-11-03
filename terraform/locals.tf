locals {
  region = var.aws_region
  ecr_defaults = {
    repository_name = "s18s"
  }
  ecr = merge(local.ecr_defaults, var.ecr_values)

  ecs_defaults = {
    cluster_name = "ecs-cluster"
    service_name = "ecs-service"
  }
  ecs = merge(local.ecs_defaults, var.ecs_values)

  lb_defaults = {
    name     = "tf-alb"
    internal = false
    target_group = {
      name     = "tf-alb-tg"
      port     = 80
      protocol = "HTTP"
    }
  }
  lb = merge(local.lb_defaults, var.lb_values)

  vpc_defaults = {
    id = "vpc-0d94b572a496c92d3"
  }
  vpc             = merge(local.vpc_defaults, var.vpc)
  use_default_vpc = local.vpc.id == "vpc-0d94b572a496c92d3"

  container_defaults = {
    name  = "s18s"
    image = "particule/helloworld"
    ports = [80]
  }
  container = merge(local.container_defaults, var.container)
}
