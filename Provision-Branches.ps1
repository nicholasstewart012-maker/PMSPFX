<# 
Provision-Branches.ps1
Creates "Branch Locations" list + fields and "Branch Documents" library in SharePoint Online.

Prereq:
Install-Module PnP.PowerShell -Scope CurrentUser

cd path\to\file
.\Provision-Branches.ps1 -SiteUrl "https://tenant.sharepoint.com/sites/YOURSITE" -Interactive


Usage:
.\Provision-Branches.ps1 -SiteUrl "https://tenant.sharepoint.com/sites/YOURSITE" -Interactive
#>

param(
  [Parameter(Mandatory=$true)]
  [string]$SiteUrl,

  [switch]$Interactive,

  [string]$Tenant
)

$ErrorActionPreference = "Stop"

function Ensure-PnPModule {
  if (-not (Get-Module -ListAvailable -Name "PnP.PowerShell")) {
    throw "PnP.PowerShell not found. Install with: Install-Module PnP.PowerShell -Scope CurrentUser"
  }
}

function Ensure-List {
  param(
    [Parameter(Mandatory=$true)][string]$Title,
    [Parameter(Mandatory=$true)][ValidateSet("List","DocumentLibrary")][string]$Type
  )

  $existing = Get-PnPList -Identity $Title -ErrorAction SilentlyContinue
  if ($null -ne $existing) {
    Write-Host "Exists: $Type '$Title'"
    return $existing
  }

  if ($Type -eq "List") {
    Write-Host "Creating list '$Title'..."
    New-PnPList -Title $Title -Template GenericList | Out-Null
  } else {
    Write-Host "Creating library '$Title'..."
    New-PnPList -Title $Title -Template DocumentLibrary | Out-Null
  }

  return Get-PnPList -Identity $Title
}

function Ensure-FieldText {
  param([string]$List, [string]$InternalName, [string]$DisplayName)
  $f = Get-PnPField -List $List -Identity $InternalName -ErrorAction SilentlyContinue
  if ($null -ne $f) { return }
  Add-PnPField -List $List -Type Text -InternalName $InternalName -DisplayName $DisplayName | Out-Null
}

function Ensure-FieldNumber {
  param([string]$List, [string]$InternalName, [string]$DisplayName)
  $f = Get-PnPField -List $List -Identity $InternalName -ErrorAction SilentlyContinue
  if ($null -ne $f) { return }
  Add-PnPField -List $List -Type Number -InternalName $InternalName -DisplayName $DisplayName | Out-Null
}

function Ensure-FieldBoolean {
  param([string]$List, [string]$InternalName, [string]$DisplayName)
  $f = Get-PnPField -List $List -Identity $InternalName -ErrorAction SilentlyContinue
  if ($null -ne $f) { return }
  Add-PnPField -List $List -Type Boolean -InternalName $InternalName -DisplayName $DisplayName | Out-Null
}

function Ensure-FieldUrl {
  param([string]$List, [string]$InternalName, [string]$DisplayName)
  $f = Get-PnPField -List $List -Identity $InternalName -ErrorAction SilentlyContinue
  if ($null -ne $f) { return }
  Add-PnPField -List $List -Type URL -InternalName $InternalName -DisplayName $DisplayName | Out-Null
  Set-PnPField -List $List -Identity $InternalName -Values @{ DisplayFormat = 0 } | Out-Null
}

function Ensure-TitleDisplayName {
  param([string]$List, [string]$NewDisplayName)
  $titleField = Get-PnPField -List $List -Identity "Title" -ErrorAction Stop
  if ($titleField.Title -ne $NewDisplayName) {
    Write-Host "Updating Title field display name to '$NewDisplayName'..."
    Set-PnPField -List $List -Identity "Title" -Values @{ Title = $NewDisplayName } | Out-Null
  }
}

# --- MAIN ---
Ensure-PnPModule

Write-Host "Connecting to $SiteUrl ..."
if ($Interactive) {
  Connect-PnPOnline -Url $SiteUrl -Interactive
} elseif ($Tenant) {
  Connect-PnPOnline -Url $SiteUrl -Tenant $Tenant -Interactive
} else {
  Connect-PnPOnline -Url $SiteUrl -Interactive
}

$listName = "Branch Locations"
$libName  = "Branch Documents"

Ensure-List -Title $listName -Type "List" | Out-Null
Ensure-List -Title $libName  -Type "DocumentLibrary" | Out-Null

Ensure-TitleDisplayName -List $listName -NewDisplayName "Title"

Ensure-FieldText -List $listName -InternalName "State"           -DisplayName "State"
Ensure-FieldText -List $listName -InternalName "Branch"          -DisplayName "Branch"
Ensure-FieldText -List $listName -InternalName "Street"          -DisplayName "Street"
Ensure-FieldText -List $listName -InternalName "City"            -DisplayName "City"
Ensure-FieldText -List $listName -InternalName "Zip"             -DisplayName "Zip"
Ensure-FieldText -List $listName -InternalName "Country"         -DisplayName "Country"
Ensure-FieldText -List $listName -InternalName "Contact"         -DisplayName "Contact"
Ensure-FieldText -List $listName -InternalName "Phone"           -DisplayName "Phone"
Ensure-FieldText -List $listName -InternalName "DistrictManager" -DisplayName "DistrictManager"

Ensure-FieldBoolean -List $listName -InternalName "Active" -DisplayName "Active"

Ensure-FieldNumber -List $listName -InternalName "Latitude"      -DisplayName "Latitude"
Ensure-FieldNumber -List $listName -InternalName "Longitude"     -DisplayName "Longitude"
Ensure-FieldNumber -List $listName -InternalName "BuildingSqft"  -DisplayName "BuildingSqft"
Ensure-FieldNumber -List $listName -InternalName "LotSqft"       -DisplayName "LotSqft"
Ensure-FieldNumber -List $listName -InternalName "ParkingSpots"  -DisplayName "ParkingSpots"
Ensure-FieldNumber -List $listName -InternalName "YearBuilt"     -DisplayName "YearBuilt"

Ensure-FieldUrl -List $listName -InternalName "BlueprintUrl"  -DisplayName "BlueprintUrl"
Ensure-FieldUrl -List $listName -InternalName "FloorplanUrl"  -DisplayName "FloorplanUrl"
Ensure-FieldUrl -List $listName -InternalName "DocsFolderUrl" -DisplayName "DocsFolderUrl"

Write-Host ""
Write-Host "Provisioning complete."
Write-Host "List: $listName"
Write-Host "Library: $libName"
