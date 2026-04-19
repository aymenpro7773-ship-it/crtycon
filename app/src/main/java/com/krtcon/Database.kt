package com.krtcon
import androidx.room.*

@Dao
interface KrootDao {
    @Query("SELECT * FROM cards WHERE category = :category AND isUsed = 0 LIMIT 1")
    suspend fun getAvailableCard(category: Int): Card?
    @Update
    suspend fun updateCard(card: Card)
    @Insert
    suspend fun insertCard(card: Card)
    @Query("SELECT COUNT(*) FROM cards WHERE category = :category AND isUsed = 0")
    suspend fun getInventoryCount(category: Int): Int
    @Insert
    suspend fun insertLog(log: OperationLog)
    @Query("SELECT * FROM logs ORDER BY timestamp DESC")
    suspend fun getAllLogs(): List<OperationLog>
    @Query("SELECT * FROM settings WHERE `key` = :key")
    suspend fun getSetting(key: String): Setting?
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveSetting(setting: Setting)
    @Query("SELECT * FROM templates WHERE category = :category")
    suspend fun getTemplate(category: Int): Template?
}

@Database(entities = [Card::class, OperationLog::class, Setting::class, Template::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun krootDao(): KrootDao
}
