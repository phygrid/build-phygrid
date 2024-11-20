data "cloudflare_accounts" "console_deployment_cloudflare_account" {
  name = (lookup(local.cloudflare_settings, terraform.workspace)).account_name
}

data "cloudflare_zone" "console_deployment_cloudflare_zone" {
  account_id = data.cloudflare_accounts.console_deployment_cloudflare_account.accounts[0].id
  name       = (lookup(local.cloudflare_settings, terraform.workspace)).zone_name
}

resource "cloudflare_pages_project" "console_deployment_cloudflare_pages_project" {
  account_id        = data.cloudflare_accounts.console_deployment_cloudflare_account.accounts[0].id
  name              = lower("phygrid-build-${terraform.workspace}")
  production_branch = "main"
  depends_on = [
    data.cloudflare_accounts.console_deployment_cloudflare_account
  ]
}

resource "cloudflare_pages_domain" "console_deployment_cloudflare_custom_domain" {
  account_id   = data.cloudflare_accounts.console_deployment_cloudflare_account.accounts[0].id
  project_name = cloudflare_pages_project.console_deployment_cloudflare_pages_project.name
  domain       = join(".", [(lookup(local.cloudflare_settings, terraform.workspace)).host, (lookup(local.cloudflare_settings, terraform.workspace)).zone_name])
  depends_on = [
    data.cloudflare_accounts.console_deployment_cloudflare_account,
    cloudflare_pages_project.console_deployment_cloudflare_pages_project
  ]
}

resource "cloudflare_record" "console_deployment_cloudflare_cname_record" {
  zone_id = data.cloudflare_zone.console_deployment_cloudflare_zone.id
  name    = (lookup(local.cloudflare_settings, terraform.workspace)).host
  value   = join(".", [cloudflare_pages_project.console_deployment_cloudflare_pages_project.name, "pages.dev"])
  type    = "CNAME"
  ttl     = 1
  proxied = true
}

output "console_deployment_cloudflare_account_id" {
  value = data.cloudflare_accounts.console_deployment_cloudflare_account.accounts[0].id
}

output "console_deployment_cloudflare_pages_name" {
  value = cloudflare_pages_project.console_deployment_cloudflare_pages_project.name
}

output "console_deployment_cloudflare_token" {
  value = nonsensitive(data.azurerm_key_vault_secret.cloudflare_token.value)
}