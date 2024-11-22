data "azurerm_key_vault" "devops_keyvault" {
  provider            = azurerm.GLOBAL
  name                = "${lookup(var.global_resource_group_names, terraform.workspace)}-devops-kv"
  resource_group_name = lookup(var.global_resource_group_names, terraform.workspace)
}