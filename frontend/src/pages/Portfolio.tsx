import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useAuth } from "@/contexts/AuthContext";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { RewardsTable } from "@/components/portfolio/RewardsTable";

const Portfolio: React.FC = () => {
  const { rewards, loading, fetchRewards, totalAmount } = usePortfolio();
  const { user } = useAuth();

  useEffect(() => {
    const userId = user?.id;
    if (userId && !loading && rewards.length === 0) {
      fetchRewards(Number(userId));
    }
  }, [user?.id, fetchRewards, loading, rewards.length]);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <Header />

      <div className="pt-20 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PortfolioHeader
            totalAmount={totalAmount}
            title="Portfolio Overview"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <RewardsTable rewards={rewards} loading={loading} limit={4} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <Button
              className="flex-1 bg-black hover:bg-gray-800 text-white"
              asChild
            >
              <Link to="/portfolio/details">
                View All Assets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
