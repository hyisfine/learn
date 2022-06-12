package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

type Res struct {
	PreOrderID int `json:"preOrderId"`
}

var client = &http.Client{}

var num = 0
var pid = "162"

// var t = "20220525"
var cookie = ";_cliid=m3uQZh6k2ccp9jEK;_siteStatVisitorType=visitorType_23467846;_orderSign=234678460110755;_orderSettleDay_110755=20220526;_orderBuyer=1;_pdDay_162_0=20220527;_siteStatId=a779961a-177c-4abf-8894-a60350011867;_siteStatDay=20220527;_siteStatRedirectUv=redirectUv_23467846;_filterVisitTime=fehihllhlqmp;_siteStatReVisit=reVisit_23467846;110755pcck300=true;_pdDay_217_0=20220527;_siteStatVisit=visit_23467846;_siteStatVisitTime=1653616096360;_FSESSIONID=NnBMcGf3L0nEeXga;loginMemberAcct=xcx_DDKW3OsPkmxFn0qa;is_beta_site_23467846_0=false;loginCaid=23467846;siteId=0"

func do() {

	var data = strings.NewReader("pdInfoList=%5B%5D&marketingType=3&marketingId=88&marketingDetailId=0&fromDetail=true&optionList=%5B%5D&amount=1&productId=" + pid)
	req, err := http.NewRequest("POST", "https://wx6.jzapp.fkw.com/23467846/0/mstl_h.jsp?cmd=setWafCk_addImmePreOrder", data)
	if err != nil {
		log.Println(err, -1)
		return
	}
	req.Header.Set("Host", "wx6.jzapp.fkw.com")
	req.Header.Set("Accept", "*/*")
	req.Header.Set("Connection", "keep-alive")
	req.Header.Set("Content-Length", "124")
	req.Header.Set("content-type", "application/x-www-form-urlencoded")
	req.Header.Set("User-Agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001441) NetType/WIFI Language/zh_CN")
	req.Header.Set("Referer", "https://servicewechat.com/wx4005c81fa92cf8d9/7/page-frame.html")
	req.Header.Set("Cookie", cookie)

	resp, err := client.Do(req)
	if err != nil {
		log.Println(err, 0)
		return
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	num++
	fmt.Println(string(body), num)
	if err != nil {
		log.Println(err, 1)
		return
	}
	preid := new(Res)
	if err = json.Unmarshal(body, preid); err != nil {
		log.Println(err, 2)
		return
	}
	if preid.PreOrderID == 0 {
		log.Println("PreOrderID为空", 3)
		return
	}
	var data1 = strings.NewReader("preOrderId=" + fmt.Sprintf("%d", preid.PreOrderID) + "&batchDeliveryList=%5B%7B%22preOrderId%22%3A" + fmt.Sprintf("%d", preid.PreOrderID) + "%2C%22mctId%22%3A0%2C%22selfRaisingMemberInfo%22%3A%7B%22prop0%22%3A%22%E5%95%86%E5%87%A1%22%2C%22prop1%22%3A%2215881413670%22%2C%22prop2%22%3A%22510503199808126624%22%7D%2C%22shipType%22%3A%22%22%2C%22shipSort%22%3A8%2C%22deliveryStyle%22%3A2%2C%22selfRaisingPoint%22%3A%7B%22id%22%3A1%2C%22name%22%3A%22%E9%87%8D%E5%BA%86%E4%BA%94%E6%B4%B2%E5%A6%87%E5%84%BF%E5%8C%BB%E9%99%A2%22%2C%22rai%22%3A%7B%22prc%22%3A%22500000%22%2C%22cic%22%3A%22500100%22%2C%22coc%22%3A%22500107%22%2C%22sta%22%3A%22%E8%B0%A2%E5%AE%B6%E6%B9%BE%E6%AD%A3%E8%A1%973%E5%8F%B7%22%7D%2C%22ais%22%3A%22%E9%87%8D%E5%BA%86%E9%87%8D%E5%BA%86%E5%B8%82%E4%B9%9D%E9%BE%99%E5%9D%A1%E5%8C%BA%E8%B0%A2%E5%AE%B6%E6%B9%BE%E6%AD%A3%E8%A1%973%E5%8F%B7%22%2C%22phone%22%3A%2202360332266%22%2C%22pp%22%3A%7B%22lng%22%3A106.51412485065521%2C%22lat%22%3A29.527649550124753%2C%22pt%22%3A1%7D%2C%22mai%22%3A1%2C%22idm%22%3Afalse%7D%2C%22errorMessage%22%3A%22%22%7D%5D")
	req1, err1 := http.NewRequest("POST", "https://wx6.jzapp.fkw.com/23467846/0/mstl_h.jsp?cmd=setWafCk_batchSetDeliveryService", data1)
	if err1 != nil {
		log.Println(err1, 4)
		return
	}
	req1.Header.Set("Host", "wx6.jzapp.fkw.com")
	req1.Header.Set("Connection", "keep-alive")
	req1.Header.Set("Content-Length", "995")
	req1.Header.Set("content-type", "application/x-www-form-urlencoded")
	req1.Header.Set("User-Agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001441) NetType/WIFI Language/zh_CN")
	req1.Header.Set("Referer", "https://servicewechat.com/wx4005c81fa92cf8d9/7/page-frame.html")
	req1.Header.Set("Cookie", cookie)
	_, err1 = client.Do(req1)
	if err1 != nil {
		log.Println(err1, 5)
		return

	}
	defer resp.Body.Close()

	var data2 = strings.NewReader(fmt.Sprintf("preOrderId=%d&orderProp=", preid.PreOrderID))
	req2, err2 := http.NewRequest("POST", "https://wx6.jzapp.fkw.com/23467846/0/mstl_h.jsp?cmd=setWafCk_settleOrder", data2)
	if err2 != nil {
		log.Println(err2, 6)
		return
	}
	req2.Header.Set("Host", "wx6.jzapp.fkw.com")
	req2.Header.Set("Connection", "keep-alive")
	req2.Header.Set("Content-Length", "28")
	req2.Header.Set("content-type", "application/x-www-form-urlencoded")
	req2.Header.Set("User-Agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001441) NetType/WIFI Language/zh_CN")
	req2.Header.Set("Referer", "https://servicewechat.com/wx4005c81fa92cf8d9/7/page-frame.html")
	req2.Header.Set("Cookie", cookie)
	resp2, err2 := client.Do(req2)
	if err2 != nil {
		log.Println(err2, 7)
		return
	}
	defer resp.Body.Close()
	body2, err := ioutil.ReadAll(resp2.Body)
	if err != nil {
		log.Println(err2, 8)
		return
	}
	fmt.Println(string(body2), num)

}

func loop() {
	for i := 0; i < 10000; i++ {
		do()
	}

}

func main() {
	c := make(chan int)
	for i := 0; i < 20; i++ {
		go loop()
	}
	<-c
}
