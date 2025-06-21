export interface IGoods {
  id: string;
  goods_name: string;
  goods_quantity: number;
  // price: number;
  action?: "incoming" | "outgoing";
  created_at?: Date;
  updated_at?: Date;
  created_by?: number; // User ID
}

export interface IGoodsLogs {
  id: number;
  goods_id: number; // Inventory ID
  user_id: number; // User ID
  action: "incoming" | "outgoing";
  quantity_changed: number;
  created_at?: Date;
}
