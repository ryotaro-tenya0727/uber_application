class Restaurant < ApplicationRecord
  has_many :foods
  has_many :line_foods, through: :foods
end
