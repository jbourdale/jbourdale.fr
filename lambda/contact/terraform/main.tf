provider "google" {
  project = var.project
  region  = var.region
}

module "cloud_function" {
  source               = "./modules/function"
  project              = var.project
  function_name        = "contact-jbourdale"
  function_entry_point = "contact"
  sendinblue_api_key   = var.sendinblue_api_key
}