class Order < ApplicationRecord
  has_many :line_foods
end
