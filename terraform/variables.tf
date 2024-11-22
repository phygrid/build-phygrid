# variable "resource_group_names" {
#   type = map(string)
#   default = {
#     DEV = "omg-dev"
#     QA  = "omg-qa"
#     EU  = "omg-eu"
#   }
# }

variable "global_resource_group_names" {
  type = map(string)
  default = {
    DEV = "omg-global-dev"
    QA  = "omg-global"
    EU  = "omg-global"
    IN  = "omg-global"
    AU  = "omg-global"
    US  = "omg-global"
    UAE = "omg-global"
  }
}

locals {
  cloudflare_settings = {
    DEV = {
      account_name  = "Phydeveloper"
      zone_name     = "phydeveloper.com"
      host          = "build"
    }
    QA = {
      account_name  = "Phygrid Limited"
      zone_name     = "phygrid.com"
      host          = "build-qa"
    }
    EU = {
      account_name  = "Phygrid Limited"
      zone_name     = "phygrid.com"
      host          = "build"
    }
  }
}