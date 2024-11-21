# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.93.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
  backend "azurerm" {
    storage_account_name = "omgdevopsterraform"
    container_name       = "tfstate"
    key                  = "phygridbuild.tfstate"
  }

  required_version = ">= 1.1.0"
}

variable "service_name" {
  type    = string
  default = "phygridbuild"
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

provider "azurerm" {
  alias = "GLOBAL"
  subscription_id = "__global_subscription_id__"

  features {}
}

locals {
  env = terraform.workspace == "DEV" ? "dev" : "prod"
}

data "azurerm_key_vault_secret" "cloudflare_token" {
  name         = "${var.service_name}-deployment-${local.env}"
  key_vault_id = data.azurerm_key_vault.devops_keyvault.id
}

provider "cloudflare" {
  api_token = data.azurerm_key_vault_secret.cloudflare_token.value
}

variable "global_subscription_id" {
  type = string
  default = "__global_subscription_id__"
}
