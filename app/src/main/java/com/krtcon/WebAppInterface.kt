package com.krtcon

import android.webkit.JavascriptInterface
import org.json.JSONArray
import org.json.JSONObject
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

class WebAppInterface(private val activity: MainActivity) {
    private val db = CrtyconApp.database
    private val scope = CoroutineScope(Dispatchers.Main)

    @JavascriptInterface
    fun getStats(): String = runBlocking(Dispatchers.IO) {
        val dao = db.krootDao()
        val stats = JSONObject()
        val allLogs = dao.getAllLogs()
        stats.put("total_success", allLogs.count { it.status == "SUCCESS" })
        val inventory = JSONObject()
        listOf(100, 200, 300, 500, 1000, 2000).forEach { cat ->
            inventory.put(cat.toString(), dao.getInventoryCount(cat))
        }
        stats.put("inventory", inventory)
        stats.toString()
    }

    @JavascriptInterface
    fun addCards(category: Int, codesJson: String) {
        val codes = JSONArray(codesJson)
        scope.launch(Dispatchers.IO) {
            for (i in 0 until codes.length()) {
                db.krootDao().insertCard(Card(category = category, code = codes.getString(i)))
            }
        }
    }

    @JavascriptInterface
    fun getLogs(): String = runBlocking(Dispatchers.IO) {
        val logs = db.krootDao().getAllLogs()
        val arr = JSONArray()
        logs.forEach { log ->
            val obj = JSONObject()
            obj.put("id", log.id)
            obj.put("timestamp", log.timestamp)
            obj.put("amount", log.amount)
            obj.put("number", log.customerNumber)
            obj.put("code", log.cardCode)
            obj.put("status", log.status)
            arr.put(obj)
        }
        arr.toString()
    }
}
